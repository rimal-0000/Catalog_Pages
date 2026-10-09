const BASE = "https://catalogdesign.onrender.com/api/catalogs";
const PAGE_BASE = "https://catalogdesign.onrender.com/api/catalog-pages";

const authHeaders = (accessToken: string) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${accessToken}`,
});

// ==================== Catalogs ====================

export interface Catalog {
  _id: string;
  title: string;
  description?: string;
  coverImage?: string;
  published: boolean;
  createdAt: string;
}

export const fetchCatalogs = async (
  accessToken: string
): Promise<Catalog[]> => {
  const res = await fetch(BASE, {
    method: "GET",
    headers: authHeaders(accessToken),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch catalogs");
  }

  return data.catalogs ?? [];
};

export const createCatalog = async (
  formData: FormData,
  accessToken: string
): Promise<Catalog> => {
  const res = await fetch(BASE, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create catalog");
  }

  return data.catalog;
};

export const deleteCatalog = async (
  id: string,
  accessToken: string
): Promise<void> => {
  const res = await fetch(`${BASE}/${id}`, {
    method: "DELETE",
    headers: authHeaders(accessToken),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to delete catalog");
  }
};

// ==================== Catalog Pages ====================

export interface CatalogPage {
  _id: string;
  catalogId: string;
  pageNumber: number;
  imageUrl: string;
  publicId: string;
}

export const fetchCatalogPages = async (
  catalogId: string
): Promise<CatalogPage[]> => {
  const res = await fetch(`${PAGE_BASE}/${catalogId}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch catalog pages");
  }

  return data.pages ?? [];
};

export const uploadCatalogPage = async (
  catalogId: string,
  formData: FormData,
  accessToken: string
): Promise<CatalogPage[]> => {
  const res = await fetch(`${PAGE_BASE}/${catalogId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to upload pages");
  }

  return data.pages ?? [];
};

export const deleteCatalogPage = async (
  pageId: string,
  accessToken: string
): Promise<void> => {
  const res = await fetch(`${PAGE_BASE}/page/${pageId}`, {
    method: "DELETE",
    headers: authHeaders(accessToken),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to delete page");
  }
};

// ==================== Public Catalogs ====================

export const fetchPublishedCatalogs = async (): Promise<Catalog[]> => {
  const res = await fetch(`${BASE}/public`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch published catalogs");
  }

  return data.catalogs ?? [];
};

export const fetchCatalogById = async (
  id: string,
  accessToken: string
): Promise<Catalog> => {
  const res = await fetch(`${BASE}/${id}`, {
    method: "GET",
    headers: authHeaders(accessToken),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch catalog");
  }

  return data.catalog;
};

export const updateCatalog = async (
  id: string,
  updates: {
    published?: boolean;
    title?: string;
    description?: string;
  },
  accessToken: string
): Promise<Catalog> => {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: authHeaders(accessToken),
    body: JSON.stringify(updates),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.message || data.error || "Failed to update catalog"
    );
  }

  return data.catalog;
};

