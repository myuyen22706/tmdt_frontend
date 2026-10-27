import StoreLayout from "./(store)/layout";
import StoreNotFound from "./(store)/not-found";

/** URL không khớp route nào vẫn hiển thị trong khung cửa hàng (header, footer, giỏ hàng). */
export default function NotFound() {
  return (
    <StoreLayout>
      <StoreNotFound />
    </StoreLayout>
  );
}
