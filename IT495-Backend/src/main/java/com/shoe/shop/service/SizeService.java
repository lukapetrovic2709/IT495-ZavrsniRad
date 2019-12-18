package com.shoe.shop.service;

import com.shoe.shop.dto.request.SizeDTO;

import java.util.List;

public interface SizeService {
    List<SizeDTO> getAllSizes();

    SizeDTO getSizeById(int id);
}
