package com.shoe.shop.service.impl;

import com.shoe.shop.dto.request.ShoeFilterDTO;
import com.shoe.shop.dto.request.ShoeRequestDTO;
import com.shoe.shop.dto.response.ShoeResponseDTO;
import com.shoe.shop.enums.GenreEnum;
import com.shoe.shop.model.Category;
import com.shoe.shop.model.Shoe;
import com.shoe.shop.model.Size;
import com.shoe.shop.repository.CategoryRepository;
import com.shoe.shop.repository.ShoeRepository;
import com.shoe.shop.repository.SizeRepository;
import com.shoe.shop.service.ShoeService;
import com.shoe.shop.util.ShoeShopException;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ShoeServiceImpl implements ShoeService {

    @Autowired
    ShoeRepository shoeRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    SizeRepository sizeRepository;

    @Autowired
    ResourceLoader resourceLoader;

    @Override
    public ShoeResponseDTO addShoe(ShoeRequestDTO shoeDTO) {
        Shoe shoe = new Shoe();
        if(!GenreEnum.checkGenre(shoeDTO.getGender())) {
            throw new ShoeShopException(HttpStatus.BAD_REQUEST, "Genre not exist!");
        }
        shoe.setGender(shoeDTO.getGender());
        shoe.setName(shoeDTO.getName());
        shoe.setIsDeleted(false);
        shoe.setPrice(shoeDTO.getPrice());
        shoe.setReleaseDate(new Date());
        Category category = categoryRepository.findById(shoeDTO.getCategoryId()).orElseThrow(() -> new ShoeShopException(HttpStatus.NOT_FOUND, "Category not exist!"));
        shoe.setCategory(category);
        File file = new File(
                getClass().getClassLoader().getResource("static" + File.separator + "images" + File.separator + "default.png").getFile()
        );
        String absolutePath = file.getAbsolutePath().replace("%5c","\\");
        shoe.setImagePath(absolutePath);
        List<Size> sizes = shoeDTO.getSizes().stream()
                .map(size -> sizeRepository.findById(size).orElseThrow(() -> new ShoeShopException(HttpStatus.NOT_FOUND, "Size not exist!")))
                .collect(Collectors.toList());
        shoe.setSizes(sizes);
        shoeRepository.save(shoe);
        return new ShoeResponseDTO(shoe);
    }

    @Override
    public ShoeResponseDTO findById(int id) {
        Shoe shoe = shoeRepository.findById(id).orElseThrow(() -> new ShoeShopException(HttpStatus.NOT_FOUND, "Shoe not exist!"));
        try {
            shoe.setImagePath(convertImageToBase64(shoe.getImagePath()));
        } catch (Exception e) {
            e.printStackTrace();
        }
        ShoeResponseDTO response = new ShoeResponseDTO(shoe);
        response.setPopularity(shoeRepository.getPopularityByShoeId(shoe.getId()));
        return response;
    }

    @Override
    public ShoeResponseDTO editShoe(int id, ShoeRequestDTO shoeDTO) {
        Shoe shoe = shoeRepository.findById(id).orElseThrow(() -> new ShoeShopException(HttpStatus.NOT_FOUND, "Shoe not exist!"));
        if(!GenreEnum.checkGenre(shoeDTO.getGender())) {
            throw new ShoeShopException(HttpStatus.BAD_REQUEST, "Genre not exist!");
        }
        Category category = categoryRepository.findById(shoeDTO.getCategoryId()).orElseThrow(() -> new ShoeShopException(HttpStatus.NOT_FOUND, "Category not exist!"));
        shoe.setCategory(category);
        shoe.setPrice(shoeDTO.getPrice());
        shoe.setName(shoeDTO.getName());
        shoe.setGender(shoeDTO.getGender());
        List<Size> sizes = shoeDTO.getSizes().stream()
                .map(size -> sizeRepository.findById(size).orElseThrow(() -> new ShoeShopException(HttpStatus.NOT_FOUND, "Size not exist!")))
                .collect(Collectors.toList());
        shoe.setSizes(sizes);
        shoeRepository.save(shoe);
        return new ShoeResponseDTO(shoe);
    }


    @Override
    public ShoeResponseDTO deleteShoe(int id) {
        Shoe shoe = shoeRepository.findById(id).orElseThrow(() -> new ShoeShopException(HttpStatus.NOT_FOUND, "Shoe not exist!"));
        shoe.setIsDeleted(true);
        shoeRepository.save(shoe);
        return new ShoeResponseDTO(shoe);
    }

    @Override
    public List<ShoeResponseDTO> findAll() {
        List<Shoe> shoes = shoeRepository.findAllByIsDeletedFalse();
        shoes = shoes.stream().map(shoe -> {
            try {
                shoe.setImagePath(convertImageToBase64(shoe.getImagePath()));
            } catch (Exception e) {
                e.printStackTrace();
            }
            return shoe;
        }).collect(Collectors.toList());
        return shoes.stream()
                .map(ShoeResponseDTO::new)
                .map(shoe -> {
                    shoe.setPopularity(shoeRepository.getPopularityByShoeId(shoe.getId()));
                    return shoe;
                })
                .collect(Collectors.toList());
    }

    @Override
    public boolean uploadPhoto(MultipartFile file, int shoeId) {
        if(file.isEmpty()) {
            throw new ShoeShopException(HttpStatus.BAD_REQUEST, "File does not exist!");
        }
        Shoe shoe = shoeRepository.findById(shoeId).orElseThrow(() -> new ShoeShopException(HttpStatus.NOT_FOUND, "Shoe not exist!"));
        String[] fileNameSplited = file.getOriginalFilename().split("\\.");
        String fileExtension = "." + fileNameSplited[fileNameSplited.length - 1];
        if(file.getSize() > 5000000) {
            throw new ShoeShopException(HttpStatus.BAD_REQUEST, "File can not exceed 5mb!");
        }
        if(!fileExtension.equals(".png") && !fileExtension.equals(".jpg") && !fileExtension.equals(".jpeg")) {
            throw new ShoeShopException(HttpStatus.BAD_REQUEST, "File must be a image!");
        }
        try {
            File photoFolder = new File(System.getProperty("user.home") + File.separator + "Desktop" + File.separator + "ShoeShop-photos");
            if(!photoFolder.exists()){
                photoFolder.mkdir();
            }
            Path path = Paths.get(photoFolder.getAbsolutePath() + File.separator + shoeId + fileExtension);
            file.transferTo(path);
            shoe.setImagePath(photoFolder.getAbsolutePath() + File.separator + shoeId + fileExtension);
            shoeRepository.save(shoe);
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public List<ShoeResponseDTO> findAllFiltered(ShoeFilterDTO shoeFilterDTO) {
        List<Shoe> shoes = shoeRepository.findAllFiltered(shoeFilterDTO.getIdCategory(), shoeFilterDTO.getDateFrom(), shoeFilterDTO.getDateTo(), shoeFilterDTO.getPriceFrom(), shoeFilterDTO.getPriceTo());
        shoes = shoes.stream().map(shoe -> {
            try {
                shoe.setImagePath(convertImageToBase64(shoe.getImagePath()));
            } catch (Exception e) {
                e.printStackTrace();
            }
            return shoe;
        }).collect(Collectors.toList());
        return shoes.stream()
                .map(ShoeResponseDTO::new)
                .map(shoe -> {
                    shoe.setPopularity(shoeRepository.getPopularityByShoeId(shoe.getId()));
                    return shoe;
                })
                .collect(Collectors.toList());
    }

    public static String convertImageToBase64(String imagePath) throws IOException {
        byte[] fileContent = FileUtils.readFileToByteArray(new File(imagePath));
        return Base64.getEncoder().encodeToString(fileContent);
    }
}
