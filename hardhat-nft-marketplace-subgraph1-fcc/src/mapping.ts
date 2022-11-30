import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
    ItemBought as ItemBoughtEvent,
    ItemCanceled as ItemCanceledEvent,
    ItemListed as ItemListedEvent,
} from "../generated/NftMarketplace/NftMarketplace"

import { ItemListed, ActiveItem, ItemBought, ItemCanceled } from "../generated/schema";

export function handleItemBought(event: ItemBoughtEvent): void {
    let itemBought = ItemBought.load(
        getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    ) //We are loading the item from event params

    let activeItem = ActiveItem.load(
        getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    ) //Everytime we list an Item we also list an active item

    if (!itemBought) {
        itemBought = new ItemBought(
            getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
        )
    }
    //Uodate parameters after creating ItemBought
    itemBought.buyer = event.params.buyer
    itemBought.nftAddress = event.params.nftAddress
    itemBought.tokenId = event.params.tokenId
    //update buyer on active item which is from Itemlisted but it doesn't have  buyer
    activeItem!.buyer = event.params.buyer

    itemBought.save()
    activeItem!.save()
}

export function handleItemCanceled(event: ItemCanceledEvent): void {
    let itemCanceled = ItemCanceled.load(
        getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    )

    let activeItem = ActiveItem.load(
        getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    )

    if(!itemCanceled) {
        itemCanceled = new ItemCanceled(getIdFromEventParams(
            event.params.tokenId, event.params.nftAddress)
        )
    }

    itemCanceled.seller = event.params.seller
    itemCanceled.nftAddress = event.params.nftAddress
    itemCanceled.tokenId = event.params.tokenId
    activeItem!.buyer = Address.fromString("0x00000000000000000000000000000000000dEaD")
    // Dead address as buyer means item has been canceled
    // Empty address means its on the market & a real address means someone bougt it
    itemCanceled.save()
    activeItem!.save()
}

export function handleItemListed(event: ItemListedEvent): void {
    let itemListed = ItemListed.load(
        getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    )

    let activeItem = ActiveItem.load(
        getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    )

    if(!itemListed){
        itemListed = new ItemListed(
            getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
        ) //If there is no itemListed we create a new itemListed
    }

    if(!activeItem){
        activeItem = new ActiveItem(
            getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
        ) // we create a new active item it doesn't exist - if there are no activeItems (New listing)
    }

    //Update new objects
    itemListed.seller = event.params.seller
    activeItem.seller = event.params.seller

    itemListed.nftAddress = event.params.nftAddress
    activeItem.nftAddress = event.params.nftAddress

    itemListed.tokenId = event.params.tokenId
    activeItem.tokenId = event.params.tokenId

    itemListed.price = event.params.price
    activeItem.price = event.params.price

    activeItem.buyer = Address.fromString("0x0000000000000000000000000000000000000000")

    // now we save
    itemListed.save()
    activeItem.save()
}

function getIdFromEventParams(tokenId: BigInt, nftAddress: Address): string {
    return tokenId.toHexString() + nftAddress.toHexString()
}
