package com.shoe.shop.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ItemRequestDTO {

    private int shoeId;

    private int quantity;

    private int size;

}
