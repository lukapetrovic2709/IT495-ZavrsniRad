package com.shoe.shop.dto.response;

import com.shoe.shop.model.Shoe;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
public class ShoeResponseDTO {

    private int id;

    private String genre;

    private String name;

    private double price;

    private int categoryId;

    private String categoryName;

    private boolean isDeleted;

    private List<SizeResponseDTO> sizes;

    private String imagePath;

    private Date releseDate;

    private int popularity;

    public ShoeResponseDTO(Shoe shoe) {
        this.id = shoe.getId();
        this.genre = shoe.getGender();
        this.name = shoe.getName();
        this.price = shoe.getPrice();
        this.categoryName = shoe.getCategory().getName();
        this.categoryId = shoe.getCategory().getId();
        this.sizes = shoe.getSizes().stream().map(SizeResponseDTO::new).collect(Collectors.toList());
        this.isDeleted = shoe.getIsDeleted();
        this.imagePath = shoe.getImagePath();
        this.releseDate = shoe.getReleaseDate();
    }

}
