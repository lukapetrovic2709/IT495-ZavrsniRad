package com.shoe.shop.dto.response;

import com.shoe.shop.dto.UserDTO;
import com.shoe.shop.model.Purchase;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
public class PurchaseResponseDTO {

    private int id;

    private double totalPrice;

    private UserDTO user;

    private List<ItemResponseDTO> items;

    private Date date;

    public PurchaseResponseDTO(Purchase purchase) {
        this.id = purchase.getId();
        this.totalPrice = purchase.getTotalPrice();
        this.user = new UserDTO(purchase.getUser());
        this.date = purchase.getDate();
        this.items = purchase.getItems().stream()
                .map(ItemResponseDTO::new)
                .collect(Collectors.toList());
    }

}
