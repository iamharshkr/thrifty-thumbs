from selenium import webdriver
from bs4 import BeautifulSoup
import re
import urllib.parse


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
    link = f"https://www.amazon.in/s?field-keywords={keyword}"
    html = dynamicUrlOpener(link, isQuit=True)
    soup = BeautifulSoup(html, 'html.parser')

    # Find all product container divs
    products = soup.find_all('div', class_=re.compile(r"s-result-item"))
    result = []
    for product in products:
        title = product.find('span', class_=re.compile(
            r"a-size-medium a-color-base a-text-normal|a-size-base-plus a-color-base a-text-normal"))
        urlDiv = product.find('a', class_=re.compile(
            r"a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal"))
        image = product.find('img', class_=re.compile(r"s-image"))
        priceDiv = product.find('span', class_=re.compile(r"a-price"))
        mrpDiv = product.find(
            'span', class_=re.compile(r"a-price a-text-price"))
        if title and image and priceDiv:
            url = urlDiv['href']
            if 'sspa/click?ie' in urlDiv['href']:
                parsed_url = urllib.parse.urlparse(urlDiv['href'])
                query = urllib.parse.parse_qs(parsed_url.query)
                url = query.get("url")[0]
            mrp = 0
            price = 0
            if priceDiv:
                price = priceDiv.find(
                    'span', class_=re.compile(r"a-offscreen"))
            if mrpDiv:
                mrp = mrpDiv.find('span', class_=re.compile(r"a-offscreen"))
                mrp = re.sub(r"₹|MRP:|,", "", mrp.text)
            price = re.sub(r"₹|,", "", price.text)
            result.append({
                "title": title.text,
                "image": image['src'],
                "price": int(float(price)),
                "mrp": int(float(mrp)),
                "url": 'https://amazon.in' + url
            })

    return result


def scrapeFlipkart(tag, isQuit=False):
    keyword = keywordEncode(tag, addPlus="add")
    url = f"https://www.flipkart.com/search?q={keyword}"
    html = dynamicUrlOpener(url, isQuit=True)
    soup = BeautifulSoup(html, 'html.parser')
    # Find all product container divs
    # Use the regular expression to search for class name
    matches = soup.find_all('div', class_=re.compile(
        r"_4ddWXP|_1AtVbE|_1xHGtK _373qXS"))
    result = []
    for match in matches:
        brandDiv = match.find('div', class_=re.compile(r"_2WkVRV"))
        title = match.find(class_=re.compile(r"_4rR01T|s1Q9rs|IRpwTa"))
        url = match.find('a', class_=re.compile(r"_1fQZEK"))
        image = match.find('img', class_=re.compile(r"_396cs4|_2r_T1I"))
        price = match.find('div', class_=re.compile(
            r"_30jeq3|_30jeq3 _1_WHN1"))
        MRP = match.find('div', class_=re.compile(r"_3I9_wc|_3I9_wc _27UcVY"))
        if title and image and price:
            brand = ''
            if brandDiv:
                brand = brandDiv.text
            if not url:
                url = title
            price = re.sub(r"₹|,", "", price.text)
            finalMRP = 0
            if MRP:
                finalMRP = int(re.sub(r"₹|,", "", MRP.text))
            result.append({
                "title": brand + ' ' + title.text,
                "image": image['src'],
                "price": int(price),
                'mrp': finalMRP,
                "url": 'https://flipkart.com' + url['href']
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
    html = dynamicUrlOpener(url, isQuit=True)
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


def scrapeAll(tag, stores):
    finalResult = {}
    for store in stores:
        if store == "amazon":
            keyword = tag.replace(" ", "+")
            link = f"https://www.amazon.in/s?field-keywords={keyword}"
            html = dynamicUrlOpener(link, isQuit=False)
            soup = BeautifulSoup(html, 'html.parser')

            # Find all product container divs
            products = soup.find_all(
                'div', class_=re.compile(r"s-result-item"))
            result = []
            for product in products:
                title = product.find('span', class_=re.compile(
                    r"a-size-medium a-color-base a-text-normal|a-size-base-plus a-color-base a-text-normal"))
                urlDiv = product.find('a', class_=re.compile(
                    r"a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal"))
                image = product.find('img', class_=re.compile(r"s-image"))
                priceDiv = product.find('span', class_=re.compile(r"a-price"))
                mrpDiv = product.find(
                    'span', class_=re.compile(r"a-price a-text-price"))
                if title and image and priceDiv:
                    url = urlDiv['href']
                    if 'sspa/click?ie' in urlDiv['href']:
                        parsed_url = urllib.parse.urlparse(urlDiv['href'])
                        query = urllib.parse.parse_qs(parsed_url.query)
                        url = query.get("url")[0]
                    mrp = 0
                    price = 0
                    if priceDiv:
                        price = priceDiv.find(
                            'span', class_=re.compile(r"a-offscreen"))
                    if mrpDiv:
                        mrp = mrpDiv.find(
                            'span', class_=re.compile(r"a-offscreen"))
                        mrp = re.sub(r"₹|MRP:|,", "", mrp.text)
                    price = re.sub(r"₹|,", "", price.text)
                    result.append({
                        "title": title.text,
                        "image": image['src'],
                        "price": int(float(price)),
                        "mrp": int(float(mrp)),
                        "url": 'https://amazon.in' + url
                    })
            finalResult["amazon"] = {
                "result": result,
                "totalCount": len(result)
            }

        # Flipkart
        if store == "flipkart":
            keyword = tag.replace(" ", "+")
            url = f"https://www.flipkart.com/search?q={keyword}"
            html = dynamicUrlOpener(url)
            soup = BeautifulSoup(html, 'html.parser')
            # Find all product container divs
            # Use the regular expression to search for class name
            matches = soup.find_all(
                'div', class_=re.compile(r"_4ddWXP|_1AtVbE|_1xHGtK _373qXS"))
            result = []
            for match in matches:
                brandDiv = match.find('div', class_=re.compile(r"_2WkVRV"))
                title = match.find(class_=re.compile(r"_4rR01T|s1Q9rs|IRpwTa"))
                url = match.find('a', class_=re.compile(r"_1fQZEK"))
                image = match.find(
                    'img', class_=re.compile(r"_396cs4|_2r_T1I"))
                price = match.find('div', class_=re.compile(
                    r"_30jeq3|_30jeq3 _1_WHN1"))
                MRP = match.find('div', class_=re.compile(
                    r"_3I9_wc|_3I9_wc _27UcVY"))
                if title and image and price:
                    brand = ''
                    if brandDiv:
                        brand = brandDiv.text
                    if not url:
                        url = title
                    price = re.sub(r"₹|,", "", price.text)
                    finalMRP = 0
                    if MRP:
                        finalMRP = int(re.sub(r"₹|,", "", MRP.text))
                    result.append({
                        "title": brand + ' ' + title.text,
                        "image": image['src'],
                        "price": int(price),
                        'mrp': finalMRP,
                        "url": 'https://flipkart.com' + url['href']
                    })

            finalResult["flipkart"] = {
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
            keyword = keywordEncode(tag, addPlus=False)
            url = f"https://www.reliancedigital.in/search?q={keyword}:relevance"
            html = dynamicUrlOpener(url)
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
