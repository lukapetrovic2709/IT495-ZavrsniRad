package com.shoe.shop.model;

import com.shoe.shop.dto.response.ShoeResponseDTO;
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
@Table(name = "shoe")
public class Shoe implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @NotNull
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;

    private String name;

    private Double price;

    private String gender;

    @Column(name = "image_path")
    private String imagePath;

    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "release_date")
    private Date releaseDate;

    @Column(name = "is_deleted")
    private Boolean isDeleted;

    @OneToMany(mappedBy="shoe", fetch = FetchType.LAZY)
    private List<Item> items;

    @ManyToOne
    @JoinColumn(name="category_id")
    private Category category;

    @ManyToMany
    @JoinTable(
            name="shoe_has_size"
            , joinColumns={
            @JoinColumn(name="shoe_id")
    }
            , inverseJoinColumns={
            @JoinColumn(name="size_id")
    }
    )    private List<Size> sizes;

}