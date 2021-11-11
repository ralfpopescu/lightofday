type Flavor = 'card' | 'compact' | 'tiny';

type EmbedProps = { trackId: string, variant?: Flavor }

const variantToHeight = {
    card: 480,
    compact: 120,
    tiny: 24,
}

export const Embed = ({ trackId, variant = 'tiny' }: EmbedProps) => (
    <iframe src={`https://audius.co/embed/track/${trackId}?flavor=${variant}`} 
        width="100%" 
        height={variantToHeight[variant]} 
        allow="encrypted-media" 
        style={{ border: 'none' }} 
        allowTransparency={variant === 'tiny'}
        title="Track ID"
    />
)