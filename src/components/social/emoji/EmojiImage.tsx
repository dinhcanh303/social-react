import { motion } from 'framer-motion'

interface EmojiImageProps {
  className?: string
  src: string
  name: string
  height?: number
  width?: number
  onClick?: any
}

const EmojiImage: React.FC<EmojiImageProps> = ({ className, src, name, height = 25, width = 25, onClick }) => {
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onClick(name)}
        className={className}
      >
        <img height={height} width={width} alt={name} src={src} />
      </motion.div>
    </>
  )
}
export default EmojiImage
