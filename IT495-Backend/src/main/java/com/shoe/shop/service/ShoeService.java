package com.shoe.shop.service;

import com.shoe.shop.dto.request.ShoeFilterDTO;
import com.shoe.shop.dto.request.ShoeRequestDTO;
import com.shoe.shop.dto.response.ShoeResponseDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ShoeService {
    ShoeResponseDTO addShoe(ShoeRequestDTO shoeDTO);

    ShoeResponseDTO findById(int id);

    ShoeResponseDTO editShoe(int id, ShoeRequestDTO shoeDTO);

    ShoeResponseDTO deleteShoe(int id);

    List<ShoeResponseDTO> findAll();

    boolean uploadPhoto(MultipartFile file, int shoeId);

    List<ShoeResponseDTO> findAllFiltered(ShoeFilterDTO shoeFilterDTO);
}
