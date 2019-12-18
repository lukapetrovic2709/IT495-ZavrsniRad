package com.shoe.shop.service;

import com.shoe.shop.dto.ChangePasswordDTO;
import com.shoe.shop.dto.UserDTO;
import com.shoe.shop.model.User;

import java.util.List;

public interface UserService {
    User findByEmail(String email);

    UserDTO register(UserDTO userDto);

    void verify(String token);

    void changePassword(ChangePasswordDTO changePasswordDTO, String email);

    List<UserDTO> findAllUsers();

    void banUser(int id);

    void unbanUser(int id);

    UserDTO editProfile(UserDTO userDTO, String email);

    UserDTO getById(int id, String email);
}
