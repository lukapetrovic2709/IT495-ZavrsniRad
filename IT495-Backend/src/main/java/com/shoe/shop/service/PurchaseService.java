package com.shoe.shop.service;

import com.shoe.shop.dto.request.PurchaseRequestDTO;
import com.shoe.shop.dto.response.PurchaseResponseDTO;

import java.util.List;

public interface PurchaseService {

    PurchaseResponseDTO addPurchase(PurchaseRequestDTO purchaseDTO, String email);

    PurchaseResponseDTO getPurchaseById(int id, String email);

    List<PurchaseResponseDTO> getMyPurchases(String email);

    List<PurchaseResponseDTO> getUserPurchases(int id);

    List<PurchaseResponseDTO> getAllPurchases();

}
