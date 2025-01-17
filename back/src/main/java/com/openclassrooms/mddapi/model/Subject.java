package.openclassrooms.mddapi.model;

@Entity
@Table(name = "subjects")
public class Subject{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;


}