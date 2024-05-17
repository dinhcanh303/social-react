import { OverlayPanel } from 'primereact/overlaypanel'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useRef } from 'react'
import { CiFaceSmile } from 'react-icons/ci'
import { Tooltip } from 'primereact/tooltip'

interface EmojiPickerProps {
  setValueEmoji: any
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ setValueEmoji }) => {
  const visibleEmoji = useRef<OverlayPanel>(null)
  return (
    <>
      <span
        data-pr-tooltip='Insert an emoji'
        data-pr-position='top'
        className='rounded-full p-1 hover:bg-gray-300 target-emoji-picker-icon text-xl cursor-pointer'
        onClick={(e) => visibleEmoji?.current?.toggle(e)}
      >
        <CiFaceSmile />
      </span>
      <OverlayPanel ref={visibleEmoji} className='p-0'>
        <Picker
          data={data}
          previewPosition='none'
          navPosition='none'
          onEmojiSelect={(e: any) => {
            if (!e?.native) return
            setValueEmoji(e.native)
          }}
        />
      </OverlayPanel>
      <Tooltip className='text-xs' target='.target-emoji-picker-icon' />
    </>
  )
}

export default EmojiPicker
