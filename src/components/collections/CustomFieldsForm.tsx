import { useFieldArray, Controller, UseFormRegister, Control } from 'react-hook-form';
import { Select } from '@headlessui/react';
import { MinusCircleIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/20/solid';
import { CollectionFormData } from '@/types/index';

type CustomFieldsProps = {
    register: UseFormRegister<CollectionFormData>;
    control?: Control<CollectionFormData>;
}

const CustomFieldsForm = ({ register, control }: CustomFieldsProps) => {

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'customFields',
    });

    return (
        <div className='my-3'>
            <label htmlFor="customFields" className="text-sm uppercase font-bold text-text-light dark:text-text-dark">Custom Fields</label>
            {fields.map((field, index) => (
                <div key={field.id} className="my-2">
                    <div className="relative flex items-center space-x-2">
                        <input
                            placeholder="Field Name"
                            {...register(`customFields.${index}.fieldName` as const, { required: 'The field is required' })}
                            className="w-1/2 p-2 border border-gray-200 rounded-lg"
                        />
                        <Controller
                            name={`customFields.${index}.fieldType` as const}
                            control={control}
                            rules={{ required: 'Field Type is required' }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    className="w-1/3 p-2 border border-gray-200 rounded-lg"
                                >
                                    <option value="" disabled>Select Type</option>
                                    <option value="number">Number</option>
                                    <option value="string">Text</option>
                                    <option value="boolean">Check</option>
                                    <option value="date">Date</option>
                                </Select>
                            )}
                        />

                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="absolute right-0"
                        >
                            <MinusCircleIcon width={25} height={25} color='red' />
                        </button>
                    </div>
                </div>
            ))}
            <button
                type="button"
                onClick={() => append({ fieldName: '', fieldType: '' })}
                className="block border border-secondary-light py-2 mt-3 px-5 rounded-lg"
            >
                <PlusIcon width={25} height={25} color='#10b981' />
            </button>
        </div>
    );
};

export default CustomFieldsForm;
