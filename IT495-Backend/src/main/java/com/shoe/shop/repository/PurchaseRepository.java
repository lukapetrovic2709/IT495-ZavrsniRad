package com.shoe.shop.repository;

import com.shoe.shop.model.Purchase;
import com.shoe.shop.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PurchaseRepository extends JpaRepository<Purchase, Integer> {

    List<Purchase> findAllByUser(User user);
}
