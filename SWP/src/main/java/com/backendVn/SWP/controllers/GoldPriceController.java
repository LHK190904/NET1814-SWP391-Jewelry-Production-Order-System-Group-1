package com.backendVn.SWP.controllers;

import com.backendVn.SWP.services.XmlToJsonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;
import com.fasterxml.jackson.databind.JsonNode;

@RestController
@RequestMapping("/api/gold")
public class GoldPriceController {

    @Autowired
    private XmlToJsonService xmlToJsonService;

    @GetMapping("/prices")
    public Mono<JsonNode> getGoldPrices() {
        return xmlToJsonService.getGoldPrices();
    }
}
