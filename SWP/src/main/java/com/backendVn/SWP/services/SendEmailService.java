package com.backendVn.SWP.services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

@Component
public class SendEmailService {

    @Autowired
    private JavaMailSender emailSender;

    @NonFinal
    @Value("${spring.mail.username}")
    String appEmail;

    @NonFinal
    @Value("${spring.mail.password}")
    String appPassword;

    public void sendSimpleMessage(String to) throws MessagingException {
        MimeMessage mimeMessage = emailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
        mimeMessageHelper.setFrom(appEmail);
        mimeMessageHelper.setTo(to);
        mimeMessageHelper.setSubject("RESET PASSWORD LINK");
        mimeMessageHelper.setText("""
                <div>
                    <p> Xin chào, bạn vừa gửi yêu cầu đổi mật khẩu, vui lòng nhấn vào đường dẫn bên dưới để thay đổi mật khẩu </p>
                    <a href="" target="_blank">Bấm vào đây để đặt lại mật khẩu</a>
                    <p> Nếu như bạn không yêu cầu điều này, vui lòng bỏ qua thông báo này ! </p>
                </div>
                """.formatted(to), true);
        emailSender.send(mimeMessage);
    }
}
