import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CollectionForm from "./CollectionForm";
import { updateCollection, uploadImageToCloudinary } from "@/api/CollectionAPI";
import { Collection, CollectionFormData } from "@/types/index";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BackButton from "../BackButton";

type EditCollectionFormProps = {
    data: CollectionFormData;
    collectionId: Collection['_id'];
}

const EditCollectionForm = ({ data, collectionId }: EditCollectionFormProps) => {

    const { t } = useTranslation();

    const initialValues: CollectionFormData = {
        collectionName: data.collectionName,
        description: data.description,
        image: '',
        category: data.category,
    }
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({ defaultValues: initialValues });

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const updateCollectionMutation = useMutation({
        mutationFn: updateCollection,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['editCollection', collectionId] });
            queryClient.invalidateQueries({ queryKey: ['collection', collectionId] });
            navigate(`/collections/${collectionId}`);
        }
    });

    const uploadImageMutation = useMutation({
        mutationFn: uploadImageToCloudinary,
        onError: (error) => {
            toast.error('Error uploading image: ' + error.message);
        },
    });

    const handleForm = async (formData: CollectionFormData) => {
        let imageUrl = data.image;

        if (formData.image && formData.image.length) {
            const toastId = toast.loading('Uploading image...');

            try {
                imageUrl = await uploadImageMutation.mutateAsync(formData.image[0]);
                toast.update(toastId, { render: "Image uploaded successfully", type: "success", isLoading: false, autoClose: 2000 });
            } catch (error) {
                return toast.update(toastId, { render: "Error uploading image", type: "error", isLoading: false, autoClose: 2000 });
            }
        }

        const collectionData = {
            formData: {
                ...formData,
                image: imageUrl,
            },
            collectionId,
        };

        updateCollectionMutation.mutate(collectionData);
    };

    return (
        <>
            <BackButton to={`/collections/${collectionId}`} />
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black text-text-light dark:text-text-dark">{t("EditCollection_Title")}</h1>
                <p className="text-2xl font-light mt-5 text-text-light dark:text-text-dark">{t("EditCollection_Subtitle")}</p>

                <form
                    className="mt-5 space-y-6 p-6 rounded-lg border-border-light border dark:bg-background-dark"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >

                    <CollectionForm register={register} errors={errors} setValue={setValue} defaultValue={initialValues.category} />

                    {data.image &&
                        <div>
                            <p className="mb-2 font-light">Current image: {''}
                                <a href={data.image} className="text-info-light">
                                    {data.image}
                                </a>
                            </p>
                            <img
                                src={data.image}
                                className="w-30 h-30 object-contain"
                                alt={data.collectionName}
                            />
                        </div>
                    }

                    <input
                        type="submit"
                        value={t("EditCollection_EditButton")}
                        disabled={uploadImageMutation.isPending || updateCollectionMutation.isPending}
                        className={`bg-secondary-dark hover:bg-secondary-dark-dark w-full block p-2 text-text-dark font-bold rounded-lg cursor-pointer transition-colors uppercase ${updateCollectionMutation.isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                    />
                </form>
            </div>
        </ >
    )
}
export default EditCollectionForm