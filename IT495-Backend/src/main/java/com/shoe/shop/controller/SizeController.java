package com.shoe.shop.controller;

import com.shoe.shop.dto.request.SizeDTO;
import com.shoe.shop.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/size")
public class SizeController {

    @Autowired
    SizeService sizeService;

    @GetMapping("/all")
    public ResponseEntity<List<SizeDTO>> getAllSizes() {
        List<SizeDTO> sizes = sizeService.getAllSizes();
        return new ResponseEntity<>(sizes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SizeDTO> getSize(@PathVariable("id") int id) {
        SizeDTO size = sizeService.getSizeById(id);
        return new ResponseEntity<>(size, HttpStatus.OK);
    }

}
