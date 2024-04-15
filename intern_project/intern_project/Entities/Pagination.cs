namespace intern_project.Entities
{
    public class Pagination
    {
        public int pageSize { get; set; }
        public int pageNumb { get; set; }
        public int totalCount { get; set; }
        public int totalPage
        {
            get
            {
                if (pageSize == 0) return 0;
                var total = totalCount / pageSize;
                if (totalCount % pageSize != 0) total++;
                return total;
            }
        }

        public Pagination()
        {
            pageSize = -1;
            pageNumb = 1;
        }
    }
}
