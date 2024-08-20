import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import CollectionForm from "@/components/collections/CollectionForm";
import { createCollection, uploadImageToCloudinary } from "@/api/CollectionAPI";
import { CollectionFormData } from "@/types/index";
import { useTranslation } from "react-i18next";
import BackButton from "@/components/BackButton";

const CreateCollectionView = () => {

    const { t } = useTranslation();

    const initialValues: CollectionFormData = {
        collectionName: '',
        description: '',
        category: { _id: '', categoryName: '', }
    }
    const { register, handleSubmit, formState: { errors }, reset, } = useForm({ defaultValues: initialValues });

    const createCollectionMutation = useMutation({
        mutationFn: createCollection,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            reset();
        }
    });

    const uploadImageMutation = useMutation({
        mutationFn: uploadImageToCloudinary,
        onError: (error) => {
            toast.error('Error uploading image: ' + error.message);
        },
    });

    const handleForm = async (formData: CollectionFormData) => {
        let imageUrl = '';

        if (formData.image && formData.image[0]) {
            imageUrl = await uploadImageMutation.mutateAsync(formData.image[0]);
        }

        const collectionData = {
            ...formData,
            image: imageUrl
        };

        createCollectionMutation.mutate(collectionData);
    };

    return (
        <>
            <BackButton to="/collections" />

            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black text-text-light dark:text-text-dark">{t("CreateCollection_Title")}</h1>
                <p className="text-2xl font-light mt-5 text-text-light dark:text-text-dark">{t("CreateCollection_Subtitle")}</p>

                <form
                    className="mt-5 space-y-6 p-6 rounded-lg border-border-light border dark:bg-background-dark"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >

                    <CollectionForm register={register} errors={errors} />

                    <input
                        type="submit"
                        value={t("CreateCollection_CreateButton")}
                        disabled={uploadImageMutation.isPending || createCollectionMutation.isPending}
                        className={`bg-secondary-dark hover:bg-secondary-dark-dark w-full block p-2 text-text-dark font-bold rounded-lg cursor-pointer transition-colors uppercase ${createCollectionMutation.isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                    />
                </form>
            </div>
        </>
    )
}
export default CreateCollectionView