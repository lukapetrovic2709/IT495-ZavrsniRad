package com.shoe.shop.model;

import com.shoe.shop.dto.request.ItemRequestDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "item")
public class Item implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @NotNull
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;

    private Integer quantity;

    private Integer size;

    @ManyToOne
    @JoinColumn(name="purchase_id")
    private Purchase purchase;

    @ManyToOne
    @JoinColumn(name="shoe_id")
    private Shoe shoe;

}