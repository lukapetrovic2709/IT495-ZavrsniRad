package com.shoe.shop.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ShoeRequestDTO {

    private String gender;

    private String name;

    private double price;

    private int categoryId;

    private List<Integer> sizes;
}