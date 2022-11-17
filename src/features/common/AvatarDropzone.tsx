import { Text } from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconUpload, IconX } from '@tabler/icons';
import { useMemo, useState } from 'react';
import { showError } from './notifications';

interface AvatarDropzoneProps {
  value?: string;
  file?: FileWithPath | null;
  onChange?: (file: FileWithPath | null) => void;
}

const AvatarDropzone = ({ value, file, onChange }: AvatarDropzoneProps) => {
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
        onMouseEnter={() => setShowCover(false)}
        onMouseLeave={() => setShowCover(true)}
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
            className='absolute w-full h-full top-0'
            src={cover}
            onLoad={() => file && URL.revokeObjectURL(cover)}
            alt='avatar'
          />
        )}
      </Dropzone>
      {file && (
        <div
          className='flex gap-1 text-red-600 items-center cursor-pointer mt-1'
          onClick={() => onChange && onChange(null)}
        >
          <IconX size={18} />
          <Text size={'xs'}>Remove photo</Text>
        </div>
      )}
    </div>
  );
};

export default AvatarDropzone;
