package com.shoe.shop.dto.request;

import com.shoe.shop.model.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SizeDTO {

    private int id;

    private int value;

    public SizeDTO(Size size) {
        this.id = size.getId();
        this.value = size.getValue();
    }

}
