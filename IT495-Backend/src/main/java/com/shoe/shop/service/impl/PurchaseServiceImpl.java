package com.shoe.shop.service.impl;

import com.shoe.shop.dto.request.ItemRequestDTO;
import com.shoe.shop.dto.request.PurchaseRequestDTO;
import com.shoe.shop.dto.response.PurchaseResponseDTO;
import com.shoe.shop.enums.RoleEnum;
import com.shoe.shop.model.Item;
import com.shoe.shop.model.Purchase;
import com.shoe.shop.model.Shoe;
import com.shoe.shop.model.User;
import com.shoe.shop.repository.ItemRepository;
import com.shoe.shop.repository.PurchaseRepository;
import com.shoe.shop.repository.ShoeRepository;
import com.shoe.shop.repository.UserRepository;
import com.shoe.shop.service.PurchaseService;
import com.shoe.shop.util.ShoeShopException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PurchaseServiceImpl implements PurchaseService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PurchaseRepository purchaseRepository;

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    ShoeRepository shoeRepository;

    @Override
    @Transactional
    public PurchaseResponseDTO addPurchase(PurchaseRequestDTO purchaseDTO, String email) {
        User user = userRepository.findByEmail(email);
        Purchase purchase = new Purchase();
        purchase.setUser(user);
        purchase.setDate(new Date());
        purchaseRepository.save(purchase);
        List<Item> items = new ArrayList<>();
        double totalPrice = 0;
        for (ItemRequestDTO itemDTO: purchaseDTO.getItems()) {
            Item item = new Item();
            Shoe shoe = shoeRepository.findById(itemDTO.getShoeId()).orElseThrow(() -> new ShoeShopException(HttpStatus.NOT_FOUND, "Shoe dont exist!"));
            item.setShoe(shoe);
            item.setQuantity(itemDTO.getQuantity());
            item.setPurchase(purchase);
            item.setSize(itemDTO.getSize());
            items.add(item);
            totalPrice += shoe.getPrice() * itemDTO.getQuantity();
        }
        itemRepository.saveAll(items);
        purchase.setTotalPrice(totalPrice);
        purchase.setItems(items);

        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("name", user.getFirstName() + " " + user.getLastName());
        paramMap.put("email", user.getEmail());
        paramMap.put("address", user.getAddress() + ", " + user.getCity());
        paramMap.put("postcode", user.getPostalCode());
        paramMap.put("phone", user.getPhoneNumber());
        paramMap.put("purchaseDate", new SimpleDateFormat("dd/MM/yyyy").format(purchase.getDate()));
        paramMap.put("totalPrice", purchase.getTotalPrice().toString());
        paramMap.put("items", purchase.getItems());

        SendEmail.sendPurchaseEmail(email, "lukaodluke@gmail.com", "lukaodluke@gmail.com", "New Purchase", paramMap);
        return new PurchaseResponseDTO(purchase);
    }

    @Override
    public PurchaseResponseDTO getPurchaseById(int id, String email) {
        User user = userRepository.findByEmail(email);
        Purchase purchase = purchaseRepository.findById(id).orElseThrow(() -> new ShoeShopException(HttpStatus.NOT_FOUND, "Purchase dont exist!"));
        if(user.getRole().getId() == RoleEnum.USER.getValue() && user.getId() != purchase.getUser().getId()) {
            throw new ShoeShopException(HttpStatus.FORBIDDEN, "Can not see other user purchases!");
        }
        return new PurchaseResponseDTO(purchase);
    }

    @Override
    public List<PurchaseResponseDTO> getMyPurchases(String email) {
        User user = userRepository.findByEmail(email);
        List<Purchase> purchases = purchaseRepository.findAllByUser(user);
        return purchases.stream()
                .map(PurchaseResponseDTO::new)
                .collect(Collectors.toList());    }

    @Override
    public List<PurchaseResponseDTO> getUserPurchases(int id) {
        User user = userRepository.getOne(id);
        List<Purchase> purchases = purchaseRepository.findAllByUser(user);
        return purchases.stream()
                .map(PurchaseResponseDTO::new)
                .collect(Collectors.toList());    }

    @Override
    public List<PurchaseResponseDTO> getAllPurchases() {
        List<Purchase> purchases = purchaseRepository.findAll();
        return purchases.stream()
                .map(PurchaseResponseDTO::new)
                .collect(Collectors.toList());
    }

}
