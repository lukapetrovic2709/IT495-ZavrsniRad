package com.shoe.shop.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class ShoeFilterDTO {

    private String idCategory;
    private String dateFrom;
    private String dateTo;
    private String priceFrom;
    private String priceTo;

}
