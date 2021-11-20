type Color = [number, number, number]

export const lightColor: Color = [255, 238, 191]
export const darkColor: Color = [46, 46, 45]


export const getColorBetweenColors = (color1: Color, color2: Color, percentBetween: number): Color => {
    const rDiff = color2[0] - color1[0];
    const gDiff = color2[1] - color1[1];
    const bDiff = color2[2] - color1[2];

    return [Math.floor(rDiff * percentBetween), Math.floor(gDiff * percentBetween), Math.floor(bDiff * percentBetween)]
}

export const getColorFromArray = (color: Color) => `rgb(${color.join(', ')})`

export const lightColorString = getColorFromArray(lightColor);
export const darkColorString = getColorFromArray(darkColor);
