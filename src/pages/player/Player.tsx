import React, { FC } from "react";

import {Box, Link, space} from "@chakra-ui/react";

const tickrate = 50;

const playerSpeed = 1;
let playerDirX = 0;
let playerDirY = 0;
let player : HTMLElement | null;

setInterval(() => {update()}, tickrate)

const update = () => {

    if(player == null)
    {
        player = document.getElementById("player");
        return;
    }

    let style = getComputedStyle(player);
    let rect = player.getBoundingClientRect();
    let left = rect.left;
    let top = parseInt(style.top.replace("px", ""));

    let dx = playerDirX * 1000/tickrate * playerSpeed;
    let dy = playerDirY * 1000/tickrate * playerSpeed;
    //console.log("update tick: ", left, dx, rect.left, player.style.left);
    console.log("update tick: ", top, dy, rect.top, "vs", style.top, "vs", player.style.top);
    player.style.left = left + dx + "px";
    player.style.top = top + dy + "px";

};


window.onkeydown = (ev: KeyboardEvent): any => {
    if(ev.key === "a")
        playerDirX = -1;
    else if(ev.key === "d")
        playerDirX = 1;
    else if(ev.key === "w")
        playerDirY = -1;
    else if(ev.key === "s")
        playerDirY = 1;
}

window.onkeyup = (ev: KeyboardEvent): any => {
    if(ev.key === "a")
        playerDirX = 0;
    else if(ev.key === "d")
        playerDirX = 0;
    else if(ev.key === "w")
        playerDirY = 0;
    else if(ev.key === "s")
        playerDirY = 0;
}

function isBehindOtherElement(element : HTMLElement) {
    const boundingRect = element.getBoundingClientRect()
    // adjust coordinates to get more accurate results
    const left = boundingRect.left + 1
    const right = boundingRect.right - 1
    const top = boundingRect.top + 1
    const bottom = boundingRect.bottom - 1

    if(!element.contains(document.elementFromPoint(left, top))) return true
    if(!element.contains(document.elementFromPoint(right, top))) return true
    if(!element.contains(document.elementFromPoint(left, bottom))) return true
    if(!element.contains(document.elementFromPoint(right, bottom))) return true

    return false
}

export const Player: FC = () => {
    return (
        <Box height="50px" width="50px" background="yellow" color="yellow" id="player"
        position={"absolute"}>
        </Box>
    );
};

