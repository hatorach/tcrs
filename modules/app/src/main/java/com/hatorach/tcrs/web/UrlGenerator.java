package com.hatorach.tcrs.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by chjtom on 20.07.17.
 */
@Service
public class UrlGenerator {
  private WebProperties webProperties;

  @Autowired
  public UrlGenerator(WebProperties webProperties) {
    this.webProperties = webProperties;
  }

  public String getUrl(String urlPath) {
    return this.webProperties.getBaseUrl() + urlPath;
  }
}
