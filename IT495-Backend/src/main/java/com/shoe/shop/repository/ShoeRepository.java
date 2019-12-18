package com.shoe.shop.repository;

import com.shoe.shop.model.Shoe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShoeRepository extends JpaRepository<Shoe, Integer> {

    List<Shoe> findAllByIsDeletedFalse();

    @Query(value = "SELECT * FROM shoe_shop.shoe AS s " +
            "WHERE (:priceFrom is NULL or s.price > :priceFrom) " +
            "AND (:priceTo is NULL or s.price < :priceTo) " +
            "AND (:dateFrom IS NULL OR s.release_date >= :dateFrom) " +
            "AND (:dateTo IS NULL OR s.release_date <= :dateTo) " +
            "AND (:idCategory is NULL or s.category_id = :idCategory) " +
            "ORDER BY release_date DESC; ",
    nativeQuery = true)
    List<Shoe> findAllFiltered(@Param("idCategory") String idCategory ,@Param("dateFrom") String dateFrom, @Param("dateTo") String dateTo, @Param("priceFrom") String priceFrom, @Param("priceTo") String priceTo);

    @Query(value = "SELECT IFNULL(SUM(quantity)*COUNT(*),0) AS popularity FROM shoe_shop.item where shoe_id = :shoeId", nativeQuery = true)
    int getPopularityByShoeId(@Param("shoeId") int shoeId);
}
