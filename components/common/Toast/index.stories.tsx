import { useToast } from '@/hooks/useToast';

import { ToastProps } from './type';
import { Button } from '../Button';

import { Toast } from '.';

const storyMeta = {
  title: 'atoms/Toast',
  component: Toast,
};

export default storyMeta;
export const Default = (args: ToastProps) => {
  const toast = useToast();
  return (
    <div style={{ height: '500vh' }}>
      <Button
        onClick={() =>
          toast.success({
            title: '제목엄청긴 제목일때 어떻게 나올지 모르겠다다다다다다다다다다다다다',
            content:
              '제목엄청긴 제목일때 어떻게 나올지 모르겠다다다다다다다다다다다다다제목엄청긴 제목일때 어떻게 나올지 모르겠다다다다다다다다다다다다다제목엄청긴 제목일때 어떻게 나올지 모르겠다다다다다다다다다다다다다',
            duration: 100000,
          })
        }
      >
        성공 호출
      </Button>
      <br />
      <Button onClick={() => toast.warn({ title: '제목', content: '내용' })}>주의 호출</Button>
      <br />
      <Button onClick={() => toast.error({ title: '제목', content: '내용' })}>오류 호출</Button>
    </div>
  );
};

Default.args = {};
