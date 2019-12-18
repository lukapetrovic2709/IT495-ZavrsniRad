package com.shoe.shop.controller;

import com.shoe.shop.dto.request.ShoeFilterDTO;
import com.shoe.shop.dto.request.ShoeRequestDTO;
import com.shoe.shop.dto.response.ShoeResponseDTO;
import com.shoe.shop.service.ShoeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/shoe")
public class ShoeController {

    @Autowired
    ShoeService shoeService;

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ShoeResponseDTO> addShoe(@RequestBody ShoeRequestDTO shoeDTO) {
        ShoeResponseDTO shoe = shoeService.addShoe(shoeDTO);
        return new ResponseEntity<>(shoe, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShoeResponseDTO> getShoe(@PathVariable("id") int id) {
        ShoeResponseDTO shoe = shoeService.findById(id);
        return new ResponseEntity<>(shoe, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ShoeResponseDTO> editShoe(@PathVariable("id") int id, @RequestBody ShoeRequestDTO shoeDTO) {
        ShoeResponseDTO shoe = shoeService.editShoe(id, shoeDTO);
        return new ResponseEntity<>(shoe, HttpStatus.OK);
    }

    @PutMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ShoeResponseDTO> deleteShoe(@PathVariable("id") int id) {
        ShoeResponseDTO shoe = shoeService.deleteShoe(id);
        return new ResponseEntity<>(shoe, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ShoeResponseDTO>> getShoes() {
        List<ShoeResponseDTO> shoes = shoeService.findAll();
        return new ResponseEntity<>(shoes, HttpStatus.OK);
    }

    @PostMapping("/upload-photo/{id}")
    public ResponseEntity<Boolean> uploadPhoto(@RequestParam("file") MultipartFile file, @PathVariable("id") int shoeId) {
        boolean response = shoeService.uploadPhoto(file, shoeId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<ShoeResponseDTO>> getShoesFiltered(ShoeFilterDTO shoeFilterDTO) {
        List<ShoeResponseDTO> shoes = shoeService.findAllFiltered(shoeFilterDTO);
        return new ResponseEntity<>(shoes, HttpStatus.OK);
    }
}
