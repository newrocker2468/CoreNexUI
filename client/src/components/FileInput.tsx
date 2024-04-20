
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FC } from "react";
interface InputFileProps {
  label: string;
  setFiles: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputFile: FC<InputFileProps> = ({ label, setFiles }) => {
  return (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <Label htmlFor='picture'>{label || "Image"}</Label>
      <Input id='picture' type='file' onChange={setFiles} />
    </div>
  );
};

export default InputFile;
