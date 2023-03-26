from selenium import webdriver
from bs4 import BeautifulSoup
import re
from amazon_paapi import AmazonApi
import requests


def urlOpen(url):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.text
    else:
        return False


def dynamicUrlOpener(url, isQuit=False):
    # Start a new instance of a headless Chrome browser
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    options.add_argument('--disable-extensions')
    options.add_argument('--disable-gpu')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--no-sandbox')
    options.add_argument('disable-infobars')
    browser = webdriver.Chrome()
    browser.get(url)

    # Wait for the page to load and then extract the HTML
    html = browser.page_source
    if isQuit:
        browser.quit()
    return html


def scrapeAmazon(tag):
    keyword = keywordEncode(tag, addPlus="add")
    access_key = "Enter access key"
    secret_key = "Enter Secret key"
    partner_tag = "subhdeals-21"
    country = "IN"
    amazon = AmazonApi(access_key, secret_key, partner_tag, country)
    search_result = amazon.search_items(keywords=keyword)
    result = []
    for item in search_result.items:
        title = ''
        price = 0
        mrp = 0
        image = ''
        if item.item_info:
            title = item.item_info.title.display_value
        if item.offers.listings:
            price = item.offers.listings[0].price.amount
            if item.offers.listings[0].saving_basis:
                mrp = item.offers.listings[0].saving_basis.amount
        if item.images:
            image = item.images.primary.large.url
        url = item.detail_page_url
        result.append({
            "title": title,
            "price": int(float(price)),
            "mrp": int(float(mrp)),
            "image": image,
            "url": url
        })
    return result


def scrapeFlipkart(tag):
    keyword = keywordEncode(tag, addPlus="add")

    headers = {
        'Fk-Affiliate-Id': 'Flipkart affiliate id',
        'Fk-Affiliate-Token': 'flipkart affiliate token',
    }
    url = f"https://affiliate-api.flipkart.net/affiliate/1.0/search.json?query={keyword}&resultCount=10"

    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        # Parse the JSON response and extract the product information
        result = []
        products = response.json()['products']
        for product in products:
            price = 0
            mrp = 0
            title = product['productBaseInfoV1']['title']
            image = product['productBaseInfoV1']['imageUrls']['400x400']
            url = product['productBaseInfoV1']['productUrl']
            mrp = product['productBaseInfoV1']['maximumRetailPrice']['amount']
            fkSellingPrice = product['productBaseInfoV1']['flipkartSellingPrice']['amount']
            fkSpecialPrice = product['productBaseInfoV1']['flipkartSpecialPrice']['amount']
            if title and image:
                price = fkSpecialPrice
                if fkSellingPrice < fkSpecialPrice:
                    price = fkSellingPrice
                result.append({
                    "title": title,
                    "price": price,
                    "mrp": mrp,
                    "image": image,
                    "url": url
                })
    return result


def scrapeCroma(tag):
    # Load the website
    keyword = keywordEncode(tag, addPlus=False)
    url = f"https://www.croma.com/search/?q={keyword}&text={keyword}"
    html = dynamicUrlOpener(url, isQuit=True)
    soup = BeautifulSoup(html, 'html.parser')
    # Find all product container li
    products = soup.find_all('li', class_=re.compile(r"product-item"))
    result = []
    for product in products:
        title = product.find('h3', class_=re.compile(
            r"product-title plp-prod-title"))
        priceDiv = product.find('div', class_=re.compile(r"new-price"))
        price = priceDiv.find('span', class_=re.compile(r"amount"))
        mrpDiv = product.find('span', class_=re.compile(r"old-price"))
        imageDiv = product.find('div', class_=re.compile(
            r"product-img plp-card-thumbnail"))
        url = imageDiv.find('a')
        image = imageDiv.find('img')
        if title and price and image and url:
            mrp = 0
            if mrpDiv:
                mrp = mrpDiv.find('span', class_=re.compile(r"amount"))
                mrp = re.sub(r"₹|MRP:|,", "", mrp.text)
            price = re.sub(r"₹|,", "", price.text)
            result.append({
                "title": title.text,
                "price": int(float(price)),
                "mrp": int(float(mrp)),
                "image": image['src'],
                "url": 'https://croma.com' + url['href']
            })
    return result


def scrapeMyntra(tag):
    keyword = keywordEncode(tag, addPlus="minus")
    url = f"https://www.myntra.com/{keyword}"
    # Load the website
    html = dynamicUrlOpener(url, isQuit=True)
    soup = BeautifulSoup(html, 'html.parser')
    # Find all product container li
    products = soup.find_all('li', class_=re.compile(r"product-base"))
    result = []
    for product in products:
        brand = product.find('h3', class_=re.compile(r"product-brand"))
        title = product.find('h4', class_=re.compile(r"product-product"))
        price = product.find('span', class_=re.compile(
            r"product-discountedPrice"))
        mrp = product.find('span', class_=re.compile(r"product-strike"))
        image = product.find('img', class_=re.compile(r"img-responsive"))
        url = product.find('a')
        if title and price and image:
            price = (price.text).replace("Rs.", '')
            mrp = (mrp.text).replace("Rs.", '')
            result.append({
                "title": f"{brand.text} {title.text}",
                "price": int(float(price)),
                "mrp": int(float(mrp)),
                "image": image['src'],
                "url": 'https://myntra.com/' + url['href']
            })

    return result


def scrapeRelianceDigital(tag):
    # Load the website
    keyword = keywordEncode(tag, addPlus=False)
    url = f"https://www.reliancedigital.in/search?q={keyword}:relevance"
    html = urlOpen(url)
    soup = BeautifulSoup(html, 'html.parser')
    # Find all product container li
    products = soup.find_all('li', class_=re.compile(
        r"grid pl__container__sp blk__lg__3 blk__md__4 blk__sm__6 blk__xs__6"))
    result = []
    for product in products:
        div = product.find('div', class_=re.compile(r"slider-text"))
        title = div.find('p', class_=re.compile(r"sp__name"))
        price = div.find('span', class_=re.compile(
            r"TextWeb__Text-sc-1cyx778-0 llZwTv"))
        mrp = div.find('span', class_=re.compile(
            r"TextWeb__Text-sc-1cyx778-0 StyledPriceBoxM__MRPText-sc-1l9ms6f-0 iGdIut jpEwMQ"))
        imageDiv = product.find('div', class_=re.compile(
            r"lazy-load-image-background"))
        image = imageDiv.find('img', class_=re.compile(
            r"img-responsive imgCenter"))
        url = product.find('a')
        if title and price and image and url:
            mrpPrice = False
            if mrp:
                mrpPrice = re.sub(r"₹|,", "", mrp.text)
            price = re.sub(r"₹|,", "", price.text)
            result.append({
                "title": title.text,
                "price": int(float(price)),
                "mrp": int(float(mrpPrice)),
                "image": 'https://www.reliancedigital.in' + image['data-srcset'],
                "url": 'https://www.reliancedigital.in' + url['href']
            })
    return result


def scrapeShopclues(tag):
    try:
        # Load the website
        keyword = keywordEncode(tag, addPlus=False)
        url = f"https://bazaar.shopclues.com/search?q={keyword}&z=0&user_id=&user_segment=default&trend=1"
        html = urlOpen(url)
        soup = BeautifulSoup(html, 'html.parser')
        # Find all product container li
        products = soup.find_all('div', class_=re.compile(
            r"column col3 search_blocks"))
        result = []
        for product in products:
            title = product.find('h2')
            priceDiv = product.find('span', class_=re.compile(r"p_price"))
            mrp = product.find('span', class_=re.compile(r"old_prices"))
            imageDiv = product.find('div', class_=re.compile(r"img_section"))
            if title and priceDiv and imageDiv:
                mrpPrice = 0
                price = 0
                if mrp:
                    mrpPrice = re.sub(r"₹|,", "", mrp.text)
                if priceDiv:
                    price = re.sub(r"₹|,", "", priceDiv.text)
                image = imageDiv.find('img')
                url = product.find('a')
                result.append({
                    "title": title.text,
                    "price": int(float(price)),
                    "mrp": int(float(mrpPrice)),
                    "image": image['src'],
                    "url": "https:" + url['href']
                })
        return result
    except:
        print("Error occured at shopclues")
        return False


def scrapeAll(tag, stores):
    finalResult = {}
    for store in stores:
        if store == "amazon":
            result = scrapeAmazon(tag)
            finalResult["amazon"] = {
                "result": result,
                "totalCount": len(result)
            }

        # Flipkart
        if store == "flipkart":
            result = scrapeFlipkart(tag)
            finalResult["flipkart"] = {
                "result": result,
                "totalCount": len(result)
            }

        # shopclues
        if store == "shopclues":
            result = scrapeShopclues(tag)
            finalResult['shopclues'] = {
                "result": result,
                "totalCount": len(result)
            }
        # croma
        if store == "croma":
            keyword = keywordEncode(tag, addPlus=False)
            url = f"https://www.croma.com/search/?q={keyword}&text={keyword}"
            html = dynamicUrlOpener(url)
            soup = BeautifulSoup(html, 'html.parser')
            # Find all product container li
            products = soup.find_all('li', class_=re.compile(r"product-item"))
            result = []
            for product in products:
                title = product.find('h3', class_=re.compile(
                    r"product-title plp-prod-title"))
                priceDiv = product.find('div', class_=re.compile(r"new-price"))
                price = priceDiv.find('span', class_=re.compile(r"amount"))
                mrpDiv = product.find('span', class_=re.compile(r"old-price"))
                imageDiv = product.find('div', class_=re.compile(
                    r"product-img plp-card-thumbnail"))
                url = imageDiv.find('a')
                image = imageDiv.find('img')
                if title and price and image and url:
                    mrp = 0
                    if mrpDiv:
                        mrp = mrpDiv.find('span', class_=re.compile(r"amount"))
                        mrp = re.sub(r"₹|MRP:|,", "", mrp.text)
                    price = re.sub(r"₹|,", "", price.text)
                    result.append({
                        "title": title.text,
                        "price": int(float(price)),
                        "mrp": int(float(mrp)),
                        "image": image['src'],
                        "url": 'https://croma.com' + url['href']
                    })
            finalResult["croma"] = {
                "result": result,
                "totalLength": len(result)
            }

        # myntra
        if store == "myntra":
            keyword = keywordEncode(tag, addPlus="minus")
            url = f"https://www.myntra.com/{keyword}"
            # Load the website
            html = dynamicUrlOpener(url)
            soup = BeautifulSoup(html, 'html.parser')
            # Find all product container li
            products = soup.find_all('li', class_=re.compile(r"product-base"))
            result = []
            for product in products:
                brand = product.find('h3', class_=re.compile(r"product-brand"))
                title = product.find(
                    'h4', class_=re.compile(r"product-product"))
                price = product.find('span', class_=re.compile(
                    r"product-discountedPrice"))
                mrp = product.find(
                    'span', class_=re.compile(r"product-strike"))
                image = product.find(
                    'img', class_=re.compile(r"img-responsive"))
                url = product.find('a')
                if title and price and image:
                    price = (price.text).replace("Rs.", '')
                    mrp = (mrp.text).replace("Rs.", '')
                    result.append({
                        "title": f"{brand.text} {title.text}",
                        "price": int(float(price)),
                        "mrp": int(float(mrp)),
                        "image": image['src'],
                        "url": 'https://myntra.com/' + url['href']
                    })

            finalResult["myntra"] = {
                "result": result,
                "totalLenght": len(result)
            }

        # reliance digital
        if store == "reliance":
            result = scrapeRelianceDigital(tag)
            finalResult["reliance"] = {
                "result": result,
                "totalCount": len(result)
            }
    # dynamicUrlOpener(url='', quit=True)
    return finalResult


def keywordEncode(keyword, addPlus=False):
    if addPlus == "add":
        return keyword.replace(" ", "+")
    elif addPlus == "minus":
        return keyword.replace(" ", "-")
    else:
        from urllib.parse import quote
        return quote(keyword)
