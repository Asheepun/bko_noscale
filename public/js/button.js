import { v, add, half, mul } from "/js/vector.js";

const button = ({ text, action = () => console.log("clicked!"), pos, fontSize, color = "white", hoverColor = "#cecece", size = null, scale = 1 }) => {
    const button = {
        text,
        action,
        pos: mul(pos, scale),
        fontSize: fontSize * scale,
        color,
        hoverColor,
    };
    if(size !== null) button.size = mul(size, scale);
    else button.size = v(button.fontSize/2*button.text.length+button.fontSize, button.fontSize*2);
    button.center = add(button.pos, half(button.size));
    button.down = false;

    button.draw = (ctx) => {
        ctx.save();
        ctx.translate(button.center.x, button.center.y);
        ctx.fillStyle = button.color;
        ctx.fillRect(-button.size.x/2, -button.size.y/2, button.size.x, button.size.y);
        ctx.font = button.fontSize + "px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(button.text, -button.size.x/2 + button.fontSize/2, button.size.y/4);
        ctx.restore();
    }

    button.update = ({ pointer }) => {
        //checkClick
        if(pointer.pos.x > button.pos.x
        && pointer.pos.y > button.pos.y
        && pointer.pos.x < button.pos.x + button.size.x
        && pointer.pos.y < button.pos.y + button.size.y){
            button.color = button.hoverColor;
            if(pointer.down)button.down = true;
        }else button.color = color;
        if(!pointer.down && button.down){
            button.action();
            button.down = false;
        }
    }
    return button;
}

export default button;