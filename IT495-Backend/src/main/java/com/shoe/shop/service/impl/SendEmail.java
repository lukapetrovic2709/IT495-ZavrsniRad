package com.shoe.shop.service.impl;


import com.shoe.shop.util.ConfigureMessage;
import com.shoe.shop.util.ConfigureTemplate;

import javax.mail.Message;
import java.util.HashMap;
import java.util.Map;

public class SendEmail {

    public static boolean sendEmail(String addressTo, String addressCc, String addressBcc, String subject, Map<String, String> paramMap){
        try {
            Message message = ConfigureMessage.message(addressTo, addressCc, addressBcc, subject);
            return ConfigureTemplate.template(message, SendEmail.class, "confirmRegistrationTemplate.ftl", paramMap);
        }catch (Exception e){
            return false;
        }
    }

    public static boolean sendPurchaseEmail(String addressTo, String addressCc, String addressBcc, String subject, Map<?, ?> paramMap){
        try {
            Message message = ConfigureMessage.message(addressTo, addressCc, addressBcc, subject);
            return ConfigureTemplate.template(message, SendEmail.class, "purchaseTemplate.ftl", paramMap);
        }catch (Exception e){
            return false;
        }
    }

    public static void main(String[] args) {
        Map<String, String> paramMap = new HashMap<>();
        paramMap.put("name", "Luka");
        paramMap.put("token", "123456");
        boolean isSent = sendEmail("luka@mailinator.com", "", " ", "Confirm Registration", paramMap);
        if(isSent){
            System.out.println("Success");
        }
    }
}
