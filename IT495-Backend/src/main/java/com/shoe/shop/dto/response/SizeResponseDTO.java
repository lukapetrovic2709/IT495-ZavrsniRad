package com.shoe.shop.dto.response;

import com.shoe.shop.model.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SizeResponseDTO {

    private int id;

    private int value;

    public SizeResponseDTO(Size size) {
        this.id = size.getId();
        this.value = size.getValue();
    }
}
