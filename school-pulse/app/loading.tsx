import { Loader } from "@/components/ui/loader";

export default function Loading() {
return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Loader variant="circular" />
    </div>
);
}
