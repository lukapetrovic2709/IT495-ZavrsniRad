package com.shoe.shop.dto;

import com.shoe.shop.model.Category;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CategoryDTO {

    private int id;

    private String name;

    public  CategoryDTO(Category category) {
        this.id = category.getId();
        this.name = category.getName();
    }
}
