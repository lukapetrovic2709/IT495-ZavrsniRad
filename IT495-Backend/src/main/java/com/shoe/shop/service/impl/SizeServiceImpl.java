package com.shoe.shop.service.impl;

import com.shoe.shop.dto.request.SizeDTO;
import com.shoe.shop.model.Size;
import com.shoe.shop.repository.SizeRepository;
import com.shoe.shop.service.SizeService;
import com.shoe.shop.util.ShoeShopException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SizeServiceImpl implements SizeService {

    @Autowired
    SizeRepository sizeRepository;

    @Override
    public List<SizeDTO> getAllSizes() {
        List<Size> sizes = sizeRepository.findAll();
        return sizes.stream()
                .map(SizeDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    public SizeDTO getSizeById(int id) {
        Size size = sizeRepository.findById(id).orElseThrow(() -> new ShoeShopException(HttpStatus.NOT_FOUND, "Size not exist!"));
        return new SizeDTO(size);
    }
}
