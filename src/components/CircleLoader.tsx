const x = 250;
const y = 250;

const xRadius1 = 100;
const yRadius1 = 100;

const xRadius2 = 80;
const yRadius2 = 80;

const xarc1 = 250;
const yarc1 = 320;

const xarc2 = 250;
const yarc2 = 250;

type CircleLoaderProps = { percent: number }

export const CircleLoader = ({ percent }: CircleLoaderProps) => {
    return (
        <>
        <svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">
        <path d={`M ${x} ${y} A ${xRadius1} ${yRadius1} 0 1 0 ${xarc1} ${yarc1} ${xRadius2} ${yRadius2} 0 1 1 ${xarc2} ${yarc2}z`} stroke="black" stroke-width="2" fill="red"/>
    </svg>
    </>
    )
}