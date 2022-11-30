import { Text } from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconUpload, IconX } from '@tabler/icons';
import { useMemo, useState } from 'react';
import { showError } from './notifications';

interface AvatarDropzoneProps {
  value?: string;
  file?: FileWithPath | null;
  onChange?: (file: FileWithPath | null) => void;
  disabled?: boolean;
}
// TODO fix small issue where old avatar appears briefly after save
const AvatarDropzone = ({
  value,
  file,
  onChange,
  disabled,
}: AvatarDropzoneProps) => {
  const [showCover, setShowCover] = useState(true);

  const cover = useMemo(
    () => (file && URL.createObjectURL(file)) ?? value,
    [value, file]
  );

  return (
    <div>
      <Dropzone
        onDrop={files => onChange && onChange(files[0])}
        onReject={rejections =>
          showError({
            message: `File was not accepted!\n\n${rejections
              .map(rejection => rejection.errors)
              .flat()
              .map(error => error.message)
              .join('\n')}`,
          })
        }
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        className='w-24 h-24 rounded-md p-0 relative overflow-hidden'
        styles={{ inner: { height: '100%' } }}
        multiple={false}
        disabled={disabled}
        onMouseEnter={() => !disabled && setShowCover(false)}
        onMouseLeave={() => !disabled && setShowCover(true)}
      >
        <div className='w-full h-full flex justify-center items-center'>
          <Dropzone.Accept>
            <IconUpload size={35} stroke={1.5} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX size={35} stroke={1.5} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconUpload size={30} stroke={1.5} />
          </Dropzone.Idle>
        </div>
        {showCover && cover && (
          <img
            className='absolute w-full h-full top-0 object-cover'
            src={cover}
            onLoad={() => file && URL.revokeObjectURL(cover)}
            alt='avatar'
          />
        )}
      </Dropzone>
      {file && !disabled && (
        <Text
          size={'xs'}
          color='red'
          align='center'
          className='cursor-pointer mt-1 hover:underline'
        >
          Remove photo
        </Text>
      )}
    </div>
  );
};

export default AvatarDropzone;
