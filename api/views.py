from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from . import webScrape


@api_view(['GET'])
def index(request):
    return Response("Hello world!.")


@api_view(['GET'])
def available(request):
    data = [
        {"name": "Amazon India", "image": "amazon.svg", "storeName": "amazon"}, {"name": "Flipkart", "image": "flipkart.svg", "storeName": "flipkart"}, {"name": "ShopClues", "image": "shopclues.svg", "storeName": "shopclues"}, {"name": "Reliance Digital", "storeName": "reliance", "image": "reliance.svg"}]
    return Response({"status": True, "data": data})


@api_view(['GET'])
def scrapper(request, pk):
    try:
        keyword = (request.GET.get('keyword')).lower()
        tag = pk.lower()
        stores = tag.split('-')
        if len(stores) > 1:
            allResult = webScrape.scrapeAll(tag=keyword, stores=stores)
            return Response({"status": True, "data": allResult})
        if tag == 'amazon':
            amzResult = webScrape.scrapeAmazon(keyword)
            return Response({"status": True, "data": {"amazon": {"result": amzResult, "totalCount": len(amzResult)}}})
        elif tag == 'flipkart':
            fkResult = webScrape.scrapeFlipkart(keyword)
            return Response({"status": True, "data": {"flipkart": {"result": fkResult, "totalCount": len(fkResult)}}})
        elif tag == 'croma':
            cromaResult = webScrape.scrapeCroma(keyword)
            return Response({"status": True, "data": {"croma": {"result": cromaResult, "totalCount": len(cromaResult)}}})
        elif tag == 'reliance':
            relianceResult = webScrape.scrapeRelianceDigital(keyword)
            return Response({"status": True, "data": {"reliance": {"result": relianceResult, "totalCount": len(relianceResult)}}})
        elif tag == 'myntra':
            myntraResult = webScrape.scrapeMyntra(keyword)
            return Response({"status": True, "data": {"myntra": {"result": myntraResult, "totalCount": len(myntraResult)}}})
        elif tag == 'shopclues':
            shopcluesResult = webScrape.scrapeShopclues(keyword)
            return Response({"status": True, "data": {"shopclues": {"result": shopcluesResult, "totalCount": len(shopcluesResult)}}})
        else:
            return Response({"status": False, "error": "No result found!"}, status=status.HTTP_404_NOT_FOUND)
    except:
        return Response({"status": False, "error": "No result found!"}, status=status.HTTP_404_NOT_FOUND)
