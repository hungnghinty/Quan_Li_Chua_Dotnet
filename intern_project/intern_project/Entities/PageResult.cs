
namespace intern_project.Entities
{
    public class PageResult<T>
    {
        public Pagination Pagination { get; set; }
        public IEnumerable<T> Data { get; set; }

        public PageResult(Pagination pagination, IEnumerable<T> data)
        {
            Pagination = pagination;
            Data = data;
        }
        public static IEnumerable<T> ToPageResult(Pagination pagination, IEnumerable<T> data)
        {
            pagination.pageNumb = pagination.pageNumb < 1 ? 1 : pagination.pageNumb;
            data = data.Skip(pagination.pageSize * (pagination.pageNumb - 1)).Take(pagination.pageSize).AsEnumerable();
            return data;
        }
    }
}
