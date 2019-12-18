package com.shoe.shop.dto.response;

import com.shoe.shop.model.Item;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ItemResponseDTO {

    private int id;

    private ShoeResponseItemDTO shoe;

    private int quantity;

    private int size;

    public ItemResponseDTO(Item item) {
        this.id = item.getId();
        this.shoe = new ShoeResponseItemDTO(item.getShoe());
        this.quantity = item.getQuantity();
        this.size = item.getSize();
    }

}