package com.shoe.shop.dto.response;

import com.shoe.shop.model.Shoe;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ShoeResponseItemDTO {

    private int id;

    private String genre;

    private String name;

    private double price;

    private int categoryId;

    private String categoryName;

    private boolean isDeleted;

    private String imagePath;

    public ShoeResponseItemDTO(Shoe shoe) {
        this.id = shoe.getId();
        this.genre = shoe.getGender();
        this.name = shoe.getName();
        this.price = shoe.getPrice();
        this.categoryName = shoe.getCategory().getName();
        this.categoryId = shoe.getCategory().getId();
        this.isDeleted = shoe.getIsDeleted();
        this.imagePath = shoe.getImagePath();
    }

}
