import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { storage } from "#imports";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { getStorageKey } from "@/lib/storage";

// fix eval error @see https://github.com/colinhacks/zod/issues/4461
z.config({ jitless: true });

export const formSchema = z.object({
  enableThresholdWarning: z.boolean(),
  enableThresholdNotification: z.boolean(),
  maxTabsThreshold: z
    .number()
    .int()
    .nonnegative()
    .max(9999, "Will you realistically have this many tabs open?"),
  maxWinsThreshold: z
    .number()
    .int()
    .nonnegative()
    .max(9999, "Will you realistically have this many windows open?"),
  popupCount: z.literal(["never", "warning", "always"]),
  enablePopupCountColor: z.boolean(),
});
export type Options = z.infer<typeof formSchema>;

const defaultValues: Options = {
  popupCount: "warning",
  enableThresholdWarning: false,
  enableThresholdNotification: false,
  maxTabsThreshold: 250,
  maxWinsThreshold: 20,
  enablePopupCountColor: true,
};

function getKey(keyname: keyof Options) {
  return getStorageKey(keyname);
}

export async function getUserValues(): Promise<Options> {
  const [
    enableThresholdWarning,
    enableThresholdNotification,
    maxTabsThreshold,
    maxWinsThreshold,
    popupCount,
    enablePopupCountColor,
  ] = await Promise.all([
    storage.getItem<boolean | null>(getKey("enableThresholdWarning")),
    storage.getItem<boolean | null>(getKey("enableThresholdNotification")),
    storage.getItem<number | null>(getKey("maxTabsThreshold")),
    storage.getItem<number | null>(getKey("maxWinsThreshold")),
    storage.getItem<Options["popupCount"] | null>(getKey("popupCount")),
    storage.getItem<boolean | null>(getKey("enablePopupCountColor")),
  ]);
  return {
    enableThresholdWarning:
      enableThresholdWarning ?? defaultValues.enableThresholdWarning,
    enableThresholdNotification:
      enableThresholdNotification ?? defaultValues.enableThresholdNotification,
    maxTabsThreshold: maxTabsThreshold ?? defaultValues.maxTabsThreshold,
    maxWinsThreshold: maxWinsThreshold ?? defaultValues.maxWinsThreshold,
    popupCount: popupCount ?? defaultValues.popupCount,
    enablePopupCountColor:
      enablePopupCountColor ?? defaultValues.enablePopupCountColor,
  };
}

export function TabOptions() {
  const {
    control,
    formState: { isDirty, isSubmitting },
    handleSubmit,
    reset,
    watch,
  } = useForm<Options>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues,
  });

  const popupCount = watch("popupCount");

  const [isLoading, setIsLoading] = useState(true);

  const loadDefaults = useCallback(async () => {
    setIsLoading(true);
    try {
      const values = await getUserValues();
      reset(values);
    } catch (error) {
      console.error("Failed to load tab options:", error);
    } finally {
      setIsLoading(false);
    }
  }, [reset]);

  useEffect(() => {
    loadDefaults();
  }, [loadDefaults]);

  const onSubmit: SubmitHandler<Options> = async (value) => {
    const saves: Array<Promise<void>> = [];
    Object.keys(value).forEach((k) => {
      saves.push(storage.setItem(`local:${k}`, value[k as keyof Options]));
    });
    Promise.all(saves)
      .then(() => {
        toast.success("Tab Options saved!");
        reset(value);
      })
      .catch((err) => {
        console.error("Error saving tab options", err);
      });
  };

  const handleReset = () => {
    reset();
  };

  const disableSubmit = isLoading || isSubmitting || !isDirty;

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Tab Options</CardTitle>
        <CardDescription>Options for tabs and windows.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-tab-options" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Max Threshold Warning</FieldLegend>
              <FieldDescription>
                Set thresholds for open tabs and windows.
              </FieldDescription>
              <FieldGroup>
                <Controller
                  name="enableThresholdWarning"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field
                      orientation="horizontal"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldContent>
                        <FieldLabel htmlFor={field.name}>
                          Enable Tab List Threshold Warning
                        </FieldLabel>
                        <FieldDescription>
                          Shows a warning at the start of the tab list if the
                          number of open tabs or windows exceeds the configured
                          thresholds.
                        </FieldDescription>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </FieldContent>
                      <Switch
                        id={field.name}
                        name={field.name}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-invalid={fieldState.invalid}
                        disabled={field.disabled}
                      />
                    </Field>
                  )}
                />

                {/* <Controller
                  name="enableThresholdNotification"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field
                      orientation="horizontal"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldContent>
                        <FieldLabel htmlFor={field.name}>
                          Enable Threshold Notification
                        </FieldLabel>
                        <FieldDescription>
                          If enabled, sends a warning notification for every tab
                          or window opened above the configured thresholds.
                        </FieldDescription>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </FieldContent>
                      <Switch
                        id={field.name}
                        name={field.name}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-invalid={fieldState.invalid}
                        disabled={field.disabled}
                      />
                    </Field>
                  )}
                /> */}

                <Controller
                  name="maxTabsThreshold"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Max Tabs Threshold
                      </FieldLabel>
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        type="number"
                        min={0}
                        step={1}
                        placeholder={defaultValues.maxTabsThreshold.toString()}
                        onChange={({ target: { value } }) => {
                          field.onChange(parseInt(value, 10));
                        }}
                      />
                      <FieldDescription>
                        The number of tabs to consider as the threshold limit.
                        Used with other features, does nothing by itself.
                      </FieldDescription>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="maxWinsThreshold"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Max Windows Threshold
                      </FieldLabel>
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        type="number"
                        min={0}
                        step={1}
                        placeholder={defaultValues.maxWinsThreshold.toString()}
                        onChange={({ target: { value } }) => {
                          field.onChange(parseInt(value, 10));
                        }}
                      />
                      <FieldDescription>
                        The number of windows to consider as the threshold
                        limit. Used with other features, does nothing by itself.
                      </FieldDescription>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>

            <FieldSeparator />

            <FieldSet>
              <FieldLegend>Tab Count Display</FieldLegend>
              <FieldDescription>
                Configure the display of tab counts.
              </FieldDescription>
              <FieldGroup>
                <Controller
                  name="popupCount"
                  control={control}
                  render={({ field, fieldState }) => (
                    <FieldSet data-invalid={fieldState.invalid}>
                      <FieldLegend>Show Tab Count</FieldLegend>
                      <FieldDescription>
                        Shows the number of open tabs over the Tab Count Snooze
                        icon in the top right of your browser.
                      </FieldDescription>
                      <RadioGroup
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <Field orientation="horizontal">
                          <RadioGroupItem value="never" id="count-never" />
                          <FieldLabel
                            htmlFor="count-never"
                            className="font-normal"
                          >
                            Never
                          </FieldLabel>
                        </Field>
                        <Field orientation="horizontal">
                          <RadioGroupItem value="warning" id="count-warning" />
                          <FieldLabel
                            htmlFor="count-warning"
                            className="font-normal"
                          >
                            When above warning threshold
                          </FieldLabel>
                        </Field>
                        <Field orientation="horizontal">
                          <RadioGroupItem value="always" id="count-always" />
                          <FieldLabel
                            htmlFor="count-always"
                            className="font-normal"
                          >
                            Always
                          </FieldLabel>
                        </Field>
                      </RadioGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldSet>
                  )}
                />
                <Controller
                  name="enablePopupCountColor"
                  control={control}
                  disabled={popupCount === "never"}
                  render={({ field, fieldState }) => (
                    <Field
                      orientation="horizontal"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldContent>
                        <FieldLabel htmlFor={field.name}>
                          Color Count Above Threshold
                        </FieldLabel>
                        <FieldDescription>
                          Colors the background of the count with a warning
                          color.
                        </FieldDescription>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </FieldContent>
                      <Switch
                        id={field.name}
                        name={field.name}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-invalid={fieldState.invalid}
                        disabled={field.disabled}
                      />
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            disabled={disableSubmit}
            type="button"
            size="sm"
            variant="outline"
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            disabled={disableSubmit}
            type="submit"
            size="sm"
            form="form-tab-options"
          >
            {isSubmitting && <Spinner />}
            Save Tab Options
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
