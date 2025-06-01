import open3d as o3d
import numpy as np

# === Hàm hiển thị với nền xám, shading mặc định ===
def draw_with_gray_background(geometries, title="Open3D Viewer"):
    vis = o3d.visualization.Visualizer()
    vis.create_window(window_name=title, width=1024, height=768)
    
    for g in geometries:
        vis.add_geometry(g)

    opt = vis.get_render_option()
    opt.background_color = np.asarray([0.5, 0.5, 0.5])  # nền xám
    opt.mesh_show_back_face = True                      # hiển thị cả mặt sau
    opt.light_on = True                                 # bật đèn chiếu sáng
    opt.point_size = 3.0                                # điểm dễ thấy hơn

    vis.run()
    vis.destroy_window()


# === Bước 1: Đọc point cloud từ file PLY ===
pcd = o3d.io.read_point_cloud("cloud.ply")
print("[INFO] Đã nạp PointCloud:", pcd)

# === Bước 2: Hiển thị Point Cloud gốc ===
draw_with_gray_background([pcd], title="📌 Point Cloud Gốc")

# === Bước 3: Estimate normals để chuẩn bị tái dựng mesh ===
pcd.estimate_normals(search_param=o3d.geometry.KDTreeSearchParamHybrid(
    radius=0.1, max_nn=30))
pcd.orient_normals_consistent_tangent_plane(100)

# === Bước 4: Poisson Surface Reconstruction ===
print("[INFO] Đang dựng mesh bằng Poisson...")
mesh, densities = o3d.geometry.TriangleMesh.create_from_point_cloud_poisson(pcd, depth=9)

# === Bước 5: Lọc vùng thưa (lọc mesh theo mật độ điểm) ===
densities = np.asarray(densities)
threshold = np.percentile(densities, 5)  # giữ lại 95% vùng dày
vertices_to_keep = densities > threshold
mesh = mesh.select_by_index(np.where(vertices_to_keep)[0])
mesh.remove_unreferenced_vertices()

# === Bước 6: Tính normal để shading đẹp ===
mesh.compute_vertex_normals()

# === Bước 7: Hiển thị Mesh tái dựng ===
draw_with_gray_background([mesh], title="📌 Mesh Tái Dựng (Shading đẹp)")

# === Bước 8: So sánh trực tiếp Mesh vs Point Cloud ===
pcd.paint_uniform_color([1.0, 0.7, 0.0])   # vàng
mesh.paint_uniform_color([0.2, 0.6, 1.0])  # xanh dương

draw_with_gray_background([pcd, mesh], title="🔍 So sánh: Point Cloud (vàng) vs Mesh (xanh)")

# === Bước 9: Lưu kết quả ===
o3d.io.write_triangle_mesh("output_mesh.ply", mesh)
print("[INFO] Đã lưu Mesh tại output_mesh.ply")
