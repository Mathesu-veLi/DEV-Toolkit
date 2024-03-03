import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  cpf: z.string().min(11).max(11),
});

type TFormSchema = z.infer<typeof formSchema>;

export function Cpf() {
  const [cpf, setCpf] = useState<string>("000.000.000-00");

  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cpf: "",
    },
  });

  return (
    <div className="flex flex-col justify-center items-center gap-10 h-full">
      <div className="flex flex-col gap-4 justify-center items-center border p-5 w-80">
        <h1 className="text-xl font-semibold tracking-wider">CPF Generator</h1>
        <p className="text-lg">{cpf}</p>
        <Button onClick={() => setCpf(generateCpf())}>Generate</Button>
      </div>
      <div>
        <Form {...form}>
          <form className="flex flex-col gap-4 justify-center items-center border p-5" onSubmit={form.handleSubmit(validateForm)}>
            <h1 className="text-xl font-semibold tracking-wider">
              CPF Validator
            </h1>
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">CPF</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="000.000.000-00"
                      className="text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button>Generate</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
